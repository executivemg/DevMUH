const seat = {
  mode: 0,
  seats: [
    { name: 'VIP 01', alias: 'V1', price: '45', people: '1', serveware: '1', desc: 'This is the first VIP seat.' },
    { name: 'VIP 02', alias: 'V2', price: '45', people: '1', serveware: '1', desc: 'This is the second VIP seat.' },
    { name: 'VIP 03', alias: 'V3', price: '45', people: '1', serveware: '1', desc: 'This is the third VIP seat.' },
    { name: 'VIP 04', alias: 'V4', price: '45', people: '1', serveware: '1', desc: 'This is the fourth VIP seat.' },
    { name: 'VIP 05', alias: 'V5', price: '45', people: '1', serveware: '1', desc: 'This is the fifth VIP seat.' },
    { name: 'Regular 01', alias: 'R1', price: '25', people: '1', serveware: '1', desc: 'This is the first regular seat.' },
    { name: 'Regular 02', alias: 'R2', price: '25', people: '1', serveware: '1', desc: 'This is the second regular seat.' },
    { name: 'Regular 03', alias: 'R3', price: '25', people: '1', serveware: '1', desc: 'This is the third regular seat.' },
    { name: 'Regular 04', alias: 'R4', price: '25', people: '1', serveware: '1', desc: 'This is the fourth regular seat.' },
    { name: 'Regular 05', alias: 'R5', price: '25', people: '1', serveware: '1', desc: 'This is the fifth regular seat.' },
    { name: 'Regular 06', alias: 'R6', price: '25', people: '1', serveware: '1', desc: 'This is the sixth regular seat.' },
    { name: 'Regular 07', alias: 'R7', price: '25', people: '1', serveware: '1', desc: 'This is the seventh regular seat.' },
    { name: 'Regular 08', alias: 'R8', price: '25', people: '1', serveware: '1', desc: 'This is the eighth regular seat.' },
    { name: 'Regular 09', alias: 'R9', price: '25', people: '1', serveware: '1', desc: 'This is the ninth regular seat.' },
    { name: 'Regular 10', alias: 'R10', price: '25', people: '1', serveware: '1', desc: 'This is the tenth regular seat.' },
    { name: 'Economy 01', alias: 'E1', price: '15', people: '1', serveware: '0', desc: 'This is the first economy seat.' },
    { name: 'Economy 02', alias: 'E2', price: '15', people: '1', serveware: '0', desc: 'This is the second economy seat.' },
    { name: 'Economy 03', alias: 'E3', price: '15', people: '1', serveware: '0', desc: 'This is the third economy seat.' },
    { name: 'Economy 04', alias: 'E4', price: '15', people: '1', serveware: '0', desc: 'This is the fourth economy seat.' },
    { name: 'Economy 05', alias: 'E5', price: '15', people: '1', serveware: '0', desc: 'This is the fifth economy seat.' },
    { name: 'Economy 06', alias: 'E6', price: '15', people: '1', serveware: '0', desc: 'This is the sixth economy seat.' },
    { name: 'Economy 07', alias: 'E7', price: '15', people: '1', serveware: '0', desc: 'This is the seventh economy seat.' },
    { name: 'Economy 08', alias: 'E8', price: '15', people: '1', serveware: '0', desc: 'This is the eighth economy seat.' },
    { name: 'Economy 09', alias: 'E9', price: '15', people: '1', serveware: '0', desc: 'This is the ninth economy seat.' },
    { name: 'Economy 10', alias: 'E10', price: '15', people: '1', serveware: '0', desc: 'This is the tenth economy seat.' },
    { name: 'General 01', alias: 'G1', price: '10', people: '1', serveware: '0', desc: 'This is the first general seat.' },
    { name: 'General 02', alias: 'G2', price: '10', people: '1', serveware: '0', desc: 'This is the second general seat.' },
    { name: 'General 03', alias: 'G3', price: '10', people: '1', serveware: '0', desc: 'This is the third general seat.' },
    { name: 'General 04', alias: 'G4', price: '10', people: '1', serveware: '0', desc: 'This is the fourth general seat.' },
    { name: 'General 05', alias: 'G5', price: '10', people: '1', serveware: '0', desc: 'This is the fifth general seat.' },
    { name: 'General 06', alias: 'G6', price: '10', people: '1', serveware: '0', desc: 'This is the sixth general seat.' },
    { name: 'General 07', alias: 'G7', price: '10', people: '1', serveware: '0', desc: 'This is the seventh general seat.' },
    { name: 'General 08', alias: 'G8', price: '10', people: '1', serveware: '0', desc: 'This is the eighth general seat.' },
    { name: 'General 09', alias: 'G9', price: '10', people: '1', serveware: '0', desc: 'This is the ninth general seat.' },
    { name: 'General 10', alias: 'G10', price: '10', people: '1', serveware: '0', desc: 'This is the tenth general seat.' },
    { name: 'General 11', alias: 'G11', price: '10', people: '1', serveware: '0', desc: 'This is the eleventh general seat.' },
    { name: 'General 12', alias: 'G12', price: '10', people: '1', serveware: '0', desc: 'This is the twelfth general seat.' },
    { name: 'General 13', alias: 'G13', price: '10', people: '1', serveware: '0', desc: 'This is the thirteenth general seat.' },
    { name: 'General 14', alias: 'G14', price: '10', people: '1', serveware: '0', desc: 'This is the fourteenth general seat.' },
    { name: 'General 15', alias: 'G15', price: '10', people: '1', serveware: '0', desc: 'This is the fifteenth general seat.' },
    { name: 'General 01', alias: 'P1', price: '10', people: '1', serveware: '0', desc: 'This is the first general seat.' },
    { name: 'General 02', alias: 'P2', price: '10', people: '1', serveware: '0', desc: 'This is the second general seat.' },
    { name: 'General 03', alias: 'P3', price: '10', people: '1', serveware: '0', desc: 'This is the third general seat.' },
    { name: 'General 04', alias: 'P4', price: '10', people: '1', serveware: '0', desc: 'This is the fourth general seat.' },
    { name: 'General 05', alias: 'P5', price: '10', people: '1', serveware: '0', desc: 'This is the fifth general seat.' },
    { name: 'General 06', alias: 'P6', price: '10', people: '1', serveware: '0', desc: 'This is the sixth general seat.' },
    { name: 'General 07', alias: 'P7', price: '10', people: '1', serveware: '0', desc: 'This is the seventh general seat.' },
    { name: 'General 08', alias: 'P8', price: '10', people: '1', serveware: '0', desc: 'This is the eighth general seat.' },
    { name: 'General 09', alias: 'P9', price: '10', people: '1', serveware: '0', desc: 'This is the ninth general seat.' },
    { name: 'General 10', alias: 'P10', price: '10', people: '1', serveware: '0', desc: 'This is the tenth general seat.' },
    { name: 'General 11', alias: 'P11', price: '10', people: '1', serveware: '0', desc: 'This is the eleventh general seat.' },
    { name: 'General 12', alias: 'P12', price: '10', people: '1', serveware: '0', desc: 'This is the twelfth general seat.' },
    { name: 'General 13', alias: 'P13', price: '10', people: '1', serveware: '0', desc: 'This is the thirteenth general seat.' },
    { name: 'General 14', alias: 'P14', price: '10', people: '1', serveware: '0', desc: 'This is the fourteenth general seat.' },
    { name: 'General 15', alias: 'P15', price: '10', people: '1', serveware: '0', desc: 'This is the fifteenth general seat.' },
  ],
};

export default seat;