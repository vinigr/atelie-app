import { ADD_ROUPA } from '../actions/types';

const INITIAL_STATE = {
    data: [
      { id: "00", name: "Camisa Social", ajustes: [
        {id: "1", name: "Subir punho", concluido: true},
        {id: "2", name: "Apertar lateral", concluido: true}
      ], prazo: "05/04/19", estado: 'CONCLUÍDO', observações: '', cliente: 'Alex Santana', entrega: false},
      { id: "01", name: "Camisa Polo", ajustes: [
        {id: "1", name: "Subir punho", concluido: false},
        {id: "2", name: "Apertar lateral", concluido: false}
      ], prazo: "15/04/19", estado: 'PENDENTE', observações: '', cliente: 'José Souza', entrega: false },
      { id: "02", name: "Calça Jeans", ajustes: [
        {id: "1", name: "Bainha", concluido: true},
        {id: "2", name: "Cintura", concluido: true}
      ], prazo: "20/04/19", estado: 'CONCLUÍDO', observações: '', cliente: 'Alexandre Carvalho', entrega: true },
      { id: "03", name: "Calça Social", ajustes: [
        {id: "1", name: "Diminuir gancho", concluido: true},
        {id: "2", name: "Apertar pernas", concluido: false}
      ], prazo: "30/04/19", estado: 'PENDENTE', observações: '', cliente: 'Paulo Santos', entrega: false }
    ]
};

export default function roupas(state = INITIAL_STATE, action){
    // console.log(state)
  switch (action.type) {
    case ADD_ROUPA:
      
      return {
        ...state,
        roupas: state.data.push(action.roupa),
        
      };
    default:
      return state
  }

}