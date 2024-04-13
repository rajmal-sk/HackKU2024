import disease from './patientDiseaseDetails.js'

const diseaseDecision = async (req, res) => {
    const { severity } = disease   

    if(severity == 0) {
        //add remainder (1+today) to the user profile
        res.send('display some precautions');
    }
    else if(severity == 1) {
        console.log(req.body);
        //const availableDate = req.body.availableDate
        //console.log(availableDate);
        //send specailizations + availbleDate
        //get availble doctors from database

        res.send('doctorsList')
    }
    else if(severity == 2) {
        //book immediate appointment at nearst and availble doctor

        res.send('homepage')
    }
}

export default diseaseDecision

