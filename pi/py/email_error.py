import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import socket
import datetime

def sendEmail(errorMsg):
    host_name = socket.gethostname()
    date_time = datetime.datetime.now()

    fromaddr = "skypiweather@gmail.com"
    toaddr = "alex.woodle@yahoo.com"
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "SkyPi: POST data ERROR: " + host_name

    body = "Please check the following weather station: " +  "\n" + host_name + "\n" + str(date_time) + "\n" + errorMsg
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, "XXXXXXXX")
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()