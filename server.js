import path from 'path'
import express, { response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import colors from 'colors'
import axios from 'axios'

import diseaseDecision from './patientDiseaseDecison.js'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

const PORT = process.env.PORT || 8080

// Show all the symptoms available to choose from
app.get('/symptoms', async(req, res) => {

    // URL of the third-party API vendor
    const thirdPartyApiUrl = 'https://healthservice.priaid.ch/symptoms';

    // Third party API access token
    const token = process.env.THIRD_PARTY_API_TOKEN;

    const headers = {
        // Add the Authorization header with the token
        Authorization: `Bearer ${token}`,
        // Specify content type (optional)
        'Content-Type': 'application/json',
    };

    // Define the parameters for the request
    const params = {
        language: 'en-gb',
    };

    // Make a GET request to the third-party API vendor
     const apiResponse = await axios.get(thirdPartyApiUrl, { 
        headers,
        params,
     });

    res.json(apiResponse.data)
})

// Diagnose based on the symptoms selected by the user
app.post('/diagnose', async(req, res) => {

    // URL of the third-party API vendor
    const thirdPartyApiUrl = 'https://healthservice.priaid.ch/diagnosis';

    // Third party API access token
    const token = process.env.THIRD_PARTY_API_TOKEN;

    const sys = [9,10] // replace it with actual symptoms from the request

    const headers = {
        // Add the Authorization header with the token
        Authorization: `Bearer ${token}`,
    };

    // Define the parameters for the request
    const params = {
        language: 'en-gb', 
        symptoms:JSON.stringify(sys),
        gender:'male',
        year_of_birth:'2005',  
    };

    // Make a GET request to the third-party API vendor
     const apiResponse = await axios.get(thirdPartyApiUrl,{
        headers,
        params,
     });

    // Function to extract only Name and SpecialistID from Specialisation array
    const extractNameAndSpecialistID = (specialisationArray) => {
        return specialisationArray.map(specialisation => ({
            Name: specialisation.Name,
            SpecialistID: specialisation.SpecialistID
        }));
    };

    // Select top two issue and extra required information
     const result = apiResponse.data.slice(0, 2).map(item => ({
        Issue: {
            ID: item.Issue.ID,
            Name: item.Issue.Name
        },
        Specialisation: extractNameAndSpecialistID(item.Specialisation)
    }));

    console.log(result[0]); // Dummy print statement. Needs to be removed at the end.

    // Check if the symptoms require urgent attention. Returns a string with is either null or non-empty.
    const response = await CheckRedFlag(sys);
    
    console.log(response); // Dummy print statement. Needs to be removed at the end.

     res.send('sim');
})

// Checks if the symptoms require urgent urgent attention
async function CheckRedFlag(symptoms)
{
    for (const symptom of symptoms) {
        try {
        // URL of the third-party API vendor
        const thirdPartyApiUrl = 'https://healthservice.priaid.ch/redflag';

        // Third party API access token
        const token = process.env.THIRD_PARTY_API_TOKEN;
        
        const headers = {
            // Add the Authorization header with the token
            Authorization: `Bearer ${token}`,
            // Specify content type (optional)
            'Content-Type': 'application/json',
        };
    
        // Define the parameters for the request
        const params = {
            symptomId: symptom,
            language: 'en-gb',
        };

        // Make a GET request to the third-party API vendor
        const apiResponse = await axios.get(thirdPartyApiUrl, { 
            headers,
            params,
        });
    
          // Check if the response is not null
        if (apiResponse.data !== null) {
            return JSON.stringify(apiResponse.data);
          }

        } catch (error) {
          // Handle any errors that occur during the API request
          console.error('Error making API request:', error);
        }
      }
}

app.use('/api/disease_decision', diseaseDecision)

app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)