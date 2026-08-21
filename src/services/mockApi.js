// src/services/mockApi.js
const CANCHAS_INICIALES = [
  { id: '1', nombre: 'Exxim Futbol Factory', ubicacion: 'Formosa Centro', precioHora: 15000, imagen: 'https://imgs.search.brave.com/czSP6wJHTJgC9RQ_vjiuS93nQiiu5fXypCqqSP1vrnU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc4/MjQwOTAzNS9lcy9m/b3RvL3BvcnRlcm8t/ZGUtZiVDMyVCQXRi/b2wtc2FsYS1kdXJh/bnRlLWVsLXBhcnRp/ZG8tcGFydGlkby1k/ZS1mJUMzJUJBdGJv/bC1zYWxhLWRlLWMl/QzMlQTlzcGVkLWFy/dGlmaWNpYWwtaW5k/b29yLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1hS19yNFJF/Smc3bGVkcmwzSEV4/ZHJHV2VrQkszc1VK/U0tvMlIzY01oeTJR/PQ' },
  { id: '2', nombre: 'Le Club', ubicacion: 'Av. Gutnisky', precioHora: 14000, imagen: 'https://imgs.search.brave.com/h_fk3SZTDAdwtPjIkMwbj2c_PD_vvodgR9YjYM9aJDk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc3/ODkwOTU2OC9lcy9m/b3RvL21pbmktanVn/YWRvcmVzLWRlLWYl/QzMlQkF0Ym9sLWp1/Z2FuZG8tZW4tdW4t/ZXN0YWRpby1jdWJp/ZXJ0by1zb2JyZS1j/JUMzJUE5c3BlZC1h/cnRpZmljaWFsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/MkpiS2JrdG1LSGlX/bEFaOTN4QUZGZkY3/QUxxM0RDalhWZlp0/Z0lhbXBRPQ' },
  { id: '3', nombre: 'Complejo San Martín', ubicacion: 'Barrio San Martín', precioHora: 12000, imagen: 'https://imgs.search.brave.com/KurSlV0-e2_HijrLemiqycuSZyxBgAFqC9iy3zsd2eQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kb25w/b3RyZXJvLmNvbS9p/bWcvcG9zdHMvZnV0/Ym9sNS9mdXRib2w1/X3NtLmpwZw' },
  { id: '4', nombre: 'La Bombonerita 5', ubicacion: 'Calle España 850', precioHora: 13500, imagen: 'https://imgs.search.brave.com/F1ltvweNOxcgJNhpIL9baUxv2dLygOH2_szVQozas6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY4/MzI5MDYxL2VzL2Zv/dG8vY2luY28tYS1z/aWRlLWNhbXBvLWRl/LWYlQzMlQkF0Ym9s/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1UR3RKbHhIdTRk/YW1JaUpMRXpJekNR/TnV3RzdWQWFWVTlT/WG9FU3pzSnJzPQ' },
  { id: '5', nombre: 'El Clásico Predio', ubicacion: 'Av. Kirchner 1520', precioHora: 11000, imagen: 'https://imgs.search.brave.com/o8S0O2PIAqsAYcfFxmRe0nDfeDj9Sz6XD71N1k6lG_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/ODA2MTUyNS9lcy9m/b3RvL2YlQzMlQkF0/Ym9sLWYlQzMlQkF0/Ym9sLWFzdHJvLXR1/cmYtY2FtcG8tY2Vy/cmFkby1jb24tcmVk/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0yd2laLWtCVDBX/R1h2R2V4VEdMc3F4/aVJNZm9PUUdrVXRu/RTJBdnV2M1FjPQ' },
  { id: '6', nombre: 'Canchas La Redonda', ubicacion: 'Av. González Lelong 430', precioHora: 16000, imagen: 'https://imgs.search.brave.com/vKE2fpfF3Zqfwc-LyXTPR7Gda1f3iMhmz2fHU-uM3eU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jZG4udHJpcGFk/dmlzb3IuY29tL21l/ZGlhL3Bob3RvLW8v/MDcvOGMvMDYvNWQv/ZWwtY2xhc2ljby1m/dXRib2wtNS5qcGc' }
];

const HORARIOS_MOCK = [
  { id: '1', hora: '16:00', disponible: false },
  { id: '2', hora: '17:00', disponible: true },
  { id: '3', hora: '18:00', disponible: true },
  { id: '4', hora: '19:00', disponible: false },
  { id: '5', hora: '20:00', disponible: false },
  { id: '6', hora: '21:00', disponible: true },
  { id: '7', hora: '22:00', disponible: true },
  { id: '8', hora: '23:00', disponible: true },
];

let misReservasMock = [];

export const apiGetCanchas = async () => {
  return new Promise(resolve => setTimeout(() => resolve([...CANCHAS_INICIALES]), 800));
};

export const apiGetHorarios = async (idCancha) => {
  // El idCancha permite diferenciar la grilla por complejo en el futuro.
  return new Promise(resolve => setTimeout(() => resolve([...HORARIOS_MOCK]), 500));
};

export const apiGetReservas = async () => {
  return new Promise(resolve => setTimeout(() => resolve([...misReservasMock]), 500));
};

export const apiCrearReserva = async (reserva) => {
  return new Promise(resolve => setTimeout(() => { misReservasMock.push(reserva); resolve(true); }, 600));
};

export const apiCancelarReserva = async (id) => {
  return new Promise(resolve => setTimeout(() => { misReservasMock = misReservasMock.filter(r => r.id !== id); resolve(true); }, 600));
};

export const apiCrearCancha = async (cancha) => {
  return new Promise(resolve => setTimeout(() => { CANCHAS_INICIALES.unshift(cancha); resolve(true); }, 800));
};