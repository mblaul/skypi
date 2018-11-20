import os
import socket
import requests
import json
import subprocess
import uuid
import getpass
import time
from uuid import getnode as get_mac
from colorama import init
from termcolor import colored


init()

#Functions--------------------------------

def login(user,password):
    url = "http://18.235.27.33/api/user/login"
    user = user.replace('@','%40')

    payload = "email="+user+"&password="+password
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    response = requests.request("POST", url, data=payload, headers=headers)

    token = response.json()['token']
    #print('Your temporary token is: ' + token)
    return token
def register(token,model,hostName):
    mac = (''.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1]))

    url = "http://18.235.27.33/api/device/register"

    payload = "name=" + hostName + "&macaddress="+ mac + "&model=" +model + "&ipaddress=127.0.0.1&ispublic=true"
    headers = {
                        'Authorization': token,
                                        'Content-Type': "application/x-www-form-urlencoded"
                                                            }

    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)
    regReturn = response.json()
    print(regReturn)
    id = regReturn['_id']
    file = open('id.key', 'w')
    file.write(id)
    file.close

def letters(input):
    valids = []
    for character in input:
        if character.isalpha():
            valids.append(character)
    return ''.join(valids)
    

#Begin---------------------------------------
host = socket.gethostname()
os.system("clear")
print("")
print(colored('Welcome to the Skypi Weather Station Set Up Tool!', 'green'))
print(colored('___________________________________________________ \n', 'magenta'))
time.sleep(2)
print('We will first create your hostname for your SkyPi weather station')
time.sleep(1)
print("All numbers and special characters will be removed from the user input")
time.sleep(1)
input("Press Enter to continue... \n")
print("")
mac = (''.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1]))
firstName = input("Please enter your first name: \n")
firstAplha = letters(firstName)
lastName = input("Please enter your last name: \n")
lastAplpha = letters(lastName)
print("")
newHostName = (firstAplha[:2] + lastAplpha[:2] + mac[:2]).lower()
print("Your current hostname is: " + host)
time.sleep(1)
print("Your new hostname will be: " + newHostName)
time.sleep(1)
if host == newHostName:
    print(colored("Hostname match...", 'red'))
    time.sleep(1)
    print("Skipping hostname change...")
    time.sleep(2)
else:
    hostNamePrompt = input("May we change the hostname on your device? (y/n): \n")
    if hostNamePrompt == 'y':
        print("Changing the device hostname...")
        time.sleep(2)
        os.system("sudo raspi-config nonint do_hostname %s" % newHostName)
        print(colored('done!\n', 'green'))
    else:
        pass
print(colored('___________________________________________________ \n', 'magenta'))
print('We will now enable your sensor and validate the connections')
input("Press Enter to continue...")
print("")
print('Enabling BME280 Sensor...\n')
time.sleep(2)
os.system('raspi-config nonint do_i2c 0')
dev = os.system('ls /dev/*i2c*')
if dev != 0:
	print('Your Sensor was not found. Please ensure all conections are correct, and that you have the correct model')
	exit()

else: 
	print(colored('done!\n', 'green'))
print('Ensuring the device is properly connected to the board...')
time.sleep(2)
print("")
board = subprocess.check_output('i2cdetect -y 1',shell=True)
#print(board)
#if '77' not in board:
#    print('Error: Sensor not configured correctly. Please check the connection of your sensor  matches the config in the BME_280 sensor docs provided.')
#else:
#    print('done!')

print('Sensor set up complete. We will now set up your device so you can begin pushing weather data to SkyPi HQ')
input("Press Enter to continue...")
print(colored('___________________________________________________ \n', 'magenta'))

user = input('Enter the Email address you use to login to SkyPi Weather Services:\n')
print("")
pw = getpass.getpass('Enter the corresponding password:\n')
time.sleep(1)
print(colored('___________________________________________________ \n', 'magenta'))
time.sleep(2)
modelSelect = input("Please select the Raspberry Pi model of your weather station: \n 1.) Raspberry Pi 3 B \n 2.) Raspberry Pi 3 B+ \n ")
if modelSelect == '1':
	model = ("Raspberry Pi 3B")
elif modelSelect == '2':
	model = ("Raspberry Pi 3B Plus")
else:
	model = ("Raspberry Pi")
time.sleep(2)
print(colored('\n___________________________________________________ \n', 'magenta'))
try:
	token = login(user,pw)
except:
	print(colored("Unable to authenticate", 'red'))

try:
	register(token,model,newHostName)
except:
	print(colored("Unable to register device", 'red'))

print()
print(colored('___________________________________________________ \n', 'magenta'))
systemRestart = input("The system needs to restart so that the changes take effect, would you like to restart now? (y/n): ")

if systemRestart.lower() == 'y':
	os.system("sudo reboot")
else:
	exit()


