import React, { Component } from 'react';

class UnitConversions extends Component{
    tempConversions(DesiredUnit, tempToConvert) {
        if (DesiredUnit === 'Fahrenheit') {
          return (tempToConvert * 1.8 + 32).toFixed(2) + ' °F';
        } else {
          return tempToConvert + '°C';
        }
      }
      speedConversions(DesiredUnit, speedToConvert) {
        if (DesiredUnit === 'MPH') {
          return (speedToConvert * 2.23694).toFixed(2) + ' MPH';
        } else if (DesiredUnit === 'KPH') {
          return (speedToConvert * 3.6).toFixed(2) + ' KPH';
        } else {
          return speedToConvert + ' mps';
        }
      }
      pressureConversions(DesiredUnit, pressureToConvert) {
        if (DesiredUnit === 'PSI') {
          return (pressureToConvert * 0.0145037738).toFixed(2) + ' PSI';
        } else if (DesiredUnit === 'KPa') {
          return (pressureToConvert * 0.1).toFixed(2) + ' KPa';
        } else if (DesiredUnit === 'mb'){
          return (pressureToConvert + 'mbar');
        }  {
          return pressureToConvert + ' hPa';
        }
      }
}