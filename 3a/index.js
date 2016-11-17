import express from 'express';
import Promise from 'bluebird';
import fetch from 'node-fetch';


const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
    .then(async (res) => {
        pc = await res.json();
    })
    .catch(err => {
        console.log('Чтото пошло не так:', err);
    });