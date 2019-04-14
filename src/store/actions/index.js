import { ADD_ROUPA } from './types';

const generateId = () => {
    Math.floor(Math.random() * 1000 + 1000);
}

// const prepararRoupa = roupa => {
//     // const id = generateId();
//     console.log({...roupa}, id)
//     return { ...roupa, id };
// }


export const addRoupa = roupa => ({ type: ADD_ROUPA, roupa });