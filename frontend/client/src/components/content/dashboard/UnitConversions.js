export default function UnitConversions(unitToConvert, convertUnit, reading){
  if (convertUnit)
  {
    if (reading === 'Temperature') 
    {
      return (unitToConvert * 1.8 + 32).toFixed(2) + ' °F ';
    } else if (reading === 'Wind') {
      return (unitToConvert * 2.23694).toFixed(2) + ' MPH';
    } else if (reading === 'Pressure') {
      return (unitToConvert * 0.0145037738).toFixed(2) + ' PSI';
    } else if (reading === 'Humidity'){
      return unitToConvert;
    } 
  } else {
    if (reading === 'Temperature') 
    {
      return unitToConvert + ' °C ';
    } else if (reading === 'Wind') {
      return (unitToConvert * 3.6).toFixed(2) + 'KPH';
    } else if (reading === 'Pressure') {
      return (unitToConvert * 0.1).toFixed(2) + ' kpa';
    } else if (reading === 'Humidity'){
      return unitToConvert;
    }   
  }
}
    /*
     ----- Previous Conversion Formulas and logic-----
    *  import React, { Component } from 'react';
    *
    *  class UnitConversions extends Component{
    *      tempConversions(tempToConvert, convertUnit) {
    *          if (convertUnit)
    *          {
    *              return (tempToConvert * 1.8 + 32).toFixed(2) + ' °F';
    *          }
    *        }
    *        speedConversions(speedToConvert, convertUnit) {
    *          if (convertUnit) {
    *            return (speedToConvert * 2.23694).toFixed(2) + ' MPH';
    *          } else {
    *            return (speedToConvert * 3.6).toFixed(2) + 'KPH';
    *          }
    *        }
    *        pressureConversions(pressureToConvert, convertUnit) {
    *          if (convertUnit) {
    *            return (pressureToConvert * 0.0145037738).toFixed(2) + ' PSI';
    *          } else {
    *            return (pressureToConvert + 'mbar');
    *          }
    *      }
    *  }
    */