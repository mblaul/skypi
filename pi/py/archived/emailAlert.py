import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import socket
import datetime

hostName = socket.gethostname()
dateTime = datetime.datetime.now()

fromaddr = "XXXXXXXXXXX@gmail.com"
toaddr = "XXXXXXXXXXX@yahoo.com"
msg = MIMEMultipart()
msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = "SkyPi: POST data ERROR: " + hostName
 
body = "Please check the following weather station: " +  "\n" + hostName + "\n" + str(dateTime) 
msg.attach(MIMEText(body, 'plain'))
 
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(fromaddr, "XXXXXXXXXX")
text = msg.as_string()
server.sendmail(fromaddr, toaddr, text)
server.quit()
