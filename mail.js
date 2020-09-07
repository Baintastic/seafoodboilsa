const nodemailer = require('nodemailer');
//const mailGun = require('nodemailer-mailgun-transport');

// const auth = {
//     auth: {
//         api_key: '',
//         domain: ''
//     }
// }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = (order) => {
    const subTotal = order["total"] - order["deliveryFee"];
    const date = order["date"];
    var items = '';
    if (order["meals"].length > 0) {
        for (let i = 0; i < order["meals"].length; i++) {
            items = items + `<div>
            <p style="font-size: 14px; padding-right: 5%;">${order["meals"][i]["quantity"]} ${order["meals"][i]["name"]}</p>
            <span style="font-size: 14px;">R${order["meals"][i]["price"]}</span>
        </div>`
        }
    }

    let html = `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width" name="viewport"/>
    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
    <title></title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
    
    </head>
    <body class="clean-body" style="background-color:#62c8f0; padding-top: 20px; padding-bottom:20px;">
        <div  style="background-color: white; max-width: 600px; margin-left: auto; margin-right: auto;">
            <div style="padding: 10px; display: flex;">
                <div style="width: 100%; text-align: center;">
                    <div >
                        <img  alt="Image" class="text-center" src="" style="width: 100%; max-width: 200px;"/>
                    </div>
                </div>
               
            </div>
            <div style="background-color:#ffffff;width:100% !important; padding-top: 10px; padding-bottom: 10px;">
                <p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 22px;"><strong>New order, by ${order["firstName"]}</strong></span></p>
            </div>
            <br>
            <div style="padding-left: 10%; padding-right: 10%; display: flex;">
                <div style="width: 50%;">
                    <p style="font-size: 30px;"><strong>Total</strong></p>
                </div>
                <div style="width: 50%; text-align: right;">
                    <p style="font-size: 30px;"><strong>R${order["total"]}</strong></p>
    
                </div>
            </div>
            <div style="padding-left: 10%; padding-right: 10%;" >
            ${items}
            </div>
         
            <hr >
            <div style="padding-left: 10%; padding-right: 10%;  display: flex;">
                <div style="width: 50%;">
                    <span style="font-size: 18px;">Subtotal</span>
                    <br>
                    <span style="font-size: 14px;">Delivery Fee</span>
    
                </div>
                <div style="width: 50%; text-align: right;">
                    <span style="font-size: 18px;">R${subTotal}</span>
                    <br>
                    <span style="font-size: 14px;">R${order["deliveryFee"]}</span>
    
                </div>
            </div>
            <hr>
            <div style="padding-left: 5%; padding-right: 5%;  display: flex;">
                <div style="width: 50%;">
                    <span style="font-size: 14px;"><strong>Delivery Address</strong></span>
                    <br>
                    <span style="font-size: 14px;">${order["deliveryAddress"]}</span>
    
                </div>
                <div style="width: 50%; text-align: right;">
                    <span style="font-size: 14px;"><strong>Date</strong></span>
                    <br>
                    <span style="font-size: 14px;">${date}</span>   
                </div>
            </div>
            <hr>
            <div style="padding-left: 5%; padding-right: 5%;  display: flex;">
            <div style="width: 50%;">
                <span style="font-size: 14px;"><strong>Contact Number</strong></span>
                <br>
                <span style="font-size: 14px;">${order["cellNumber"]}</span>
            </div>
            <div style="width: 50%;">
                <span style="font-size: 14px;"><strong>Email Address</strong></span>
                <br>
                <span style="font-size: 14px;">${order["clientEmail"]}</span>
            </div>
            </div>
            <div  style="Margin: 0 auto; background-color: #525252; display: flex;  align-items: center; padding-left: 10%; padding-bottom: 2%; padding-top: 2%;">
            </div>
    
        </div >
    </body>
    </html>`

    try {
        var ownerEmail = "thabanikalio@gmail.com";
        //Send email to owner 
         transporter.sendMail({
            from: ownerEmail,
            to: ownerEmail,
            subject: "New Order",
            html: html,
        });

        //Send email to customer
         transporter.sendMail({
            from: ownerEmail,
            to: order['clientEmail'],
            subject: "Order Notification From SeaFood Boil SA",
            html: html,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail;