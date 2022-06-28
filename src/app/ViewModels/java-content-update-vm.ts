import { JavaContentUpdateDTO } from 'src/app/models/javaUpdateModels/java-content-update-dto'; 
import { JavaContentUpdateProcessingDTO } from "../models/javaUpdateModels/java-content-update-processing-dto";

export interface JavaContentUpdateVM {
        contentNames: Array<string>,
        javaContentUpdateDTO: JavaContentUpdateDTO,
        javaContentUpdateProcessingDTOs : Array<JavaContentUpdateProcessingDTO>

}

// public List<string>? ContentNames { get; set; }
//         public JavaContentUpdateDTO JavaContentUpdateDTO { get; set; }
//         [ValidateNever]
//         public List<JavaContentUpdateProcessingDTO> JavaContentUpdateProcessingDTOs { get; set; }