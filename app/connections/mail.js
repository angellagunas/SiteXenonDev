var nodemailer = require('nodemailer');
	
	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'angel.david.lagunas@gmail.com',
	        pass: 'lagunas1994GARCI'
	    }
	});

	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Fred Foo ✔ <xenon.develops@gmail.com>', // sender address
	    to: 'ark_angelito@hotmail.com, yo0_94@hotmail.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};
var sendMaill=function(server){
	

	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
		
}

module.exports=sendMaill;