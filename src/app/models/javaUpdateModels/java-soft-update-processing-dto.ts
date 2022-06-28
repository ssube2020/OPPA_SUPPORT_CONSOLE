export interface JavaSoftUpdateProcessingDTO {

    newSoftVersion: string,
    contentVersion: string,  
    oldSoftVersion: string, 
    createUser: string,  
    createDate: Date,  
    finishDate: Date,  
    lastUpdate: Date,  
    status: string,  
    expireDate: Date,  
    terminalName: string  

}