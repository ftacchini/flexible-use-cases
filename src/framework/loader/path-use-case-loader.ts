import { injectable } from "inversify";
import { DEFAULT_IGNORE_PATTERN, PathControllerLoader } from "flexible-decorators";

export const DEFAULT_USE_CASE_PATTERN = /(.+\-use-case)\.js$/;

@injectable()
export class PathUseCaseLoader extends PathControllerLoader {
    
    constructor(
        baseDir: string = "",
        filePattern: RegExp = DEFAULT_USE_CASE_PATTERN,
        ignorePattern: RegExp = DEFAULT_IGNORE_PATTERN){
            super(baseDir, filePattern, ignorePattern)
    }
}