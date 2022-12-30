
//*lever les erreurs de divions 
export class DivisionError extends Error {
    constructor(...parameters) {
        super(...parameters)
    }
}
