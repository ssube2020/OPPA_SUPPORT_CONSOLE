import { JavaSoftUpdateDTO } from "../models/javaUpdateModels/java-soft-update-dto";
import { JavaSoftUpdateProcessingDTO } from "../models/javaUpdateModels/java-soft-update-processing-dto";

export interface JavaSoftUpdateVM
{
    contentNames: Array<string>,
    javaSoftUpdateDTO: JavaSoftUpdateDTO, 
    javaSoftUpdateProcessingDTOs: Array<JavaSoftUpdateProcessingDTO>

}