const { result } = require('lodash');
const mail=require('nodemailer');
const details = require('../models/dataschema');

var log='';
const users =[]
const us=[]


//clients
const client_index = (req, res) => {
    details.find()
      .then(result => {
         
       res.render('clients', {datas : result, title: 'Clients',log });
      })
      .catch(err => {
        console.log(err);
      });
  }
 
//services
const service_index = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('services', {datas : result, title: 'Services',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
}

//air
const air = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('air', {datas : result, title: 'Air Caliberation',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
  }

//nitogen
const nitrogen = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('nitrogen', {datas : result, title: 'Services',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
}


//thermal
const thermal = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('thermal', {datas : result, title: 'Services',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
}

//caliberation
const caliberation = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('caliberation', {datas : result, title: 'Services',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
}

//login
const loginpage = (req, res) => {
  details.find()
    .then(result => {
     
     res.render('login', {datas : result, title: 'Admin',log});
    
                         
    })
    .catch(err => {
      console.log(err);
    });
}
const login = (req, res) => {
      users.pop()
      var t=Date.now()
      users.push(t)
      
     if(req.body.email === 'ivan' && req.body.password ==='1234'){
      
     details.find().sort({ name: 1 })
     .then(result => {
      res.redirect('/Adminpage' );
     })
     .catch(err => {
       console.log(err);
     });}
       else{
         res.send('Wrong Credentials')

       }
}


const deletek  = (req, res)=>{
  const id = req.params.id;

  details.findByIdAndDelete(id)
  .then(result => {
    res.send({
      message : "User was deleted successfully!"})
  })
  .catch(err => {
    console.log(err);
  });
}

 
const adminpage = (req, res) => {
      us.pop()
      var k=Date.now()
      us.push(k)
      const f=(us[0]-users[0])/1000
      if(f<180){
  details.find()
       .then(result => {
  res.render('adminpage', { datas : result, title: 'Admin page',log:'LogOut' });
})
              
    
    .catch(err => {
      console.log(err);
    });}
    else{
      res.redirect('/Admin')
    }
}


  const add_data = (req, res) => {
    const create = new details(req.body);
    create.save()
      .then(result => {
        res.redirect('/Adminpage');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const message= (req,res) =>{
    var transporter = mail.createTransport('smtps://imerrolferns@gmail.com:errolerrol@smtp.gmail.com');
  var mailOptions = {
    from: '"FROM WEBSITE" <imerrolferns@gmail.com>', // sender address (who sends)
    to: 'imerrol321@gmail.com', // list of receivers (who receives)
  
    subject: req.body.name, // Subject line
    text: req.body.message // plaintext body
    
};
console.log(req.body)
transporter.sendMail(mailOptions)
res.send({
  message : "Message Sent Successfully"})
  }

  module.exports = {
    client_index,
    service_index,
    air,
    nitrogen,
    thermal,
    caliberation,
    loginpage,
    login,
    deletek,
    adminpage,
    add_data,
    message
  }
   