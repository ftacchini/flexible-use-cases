import { PathControllerLoader } from "flexible-decorators";
export declare const DEFAULT_USE_CASE_PATTERN: RegExp;
export declare class PathUseCaseLoader extends PathControllerLoader {
    constructor(baseDir?: string, filePattern?: RegExp, ignorePattern?: RegExp);
}
