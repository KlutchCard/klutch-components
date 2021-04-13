export enum ValidationState {
    PRISTINE ,
    VALID ,
    ERROR
}

export type Validation = {
    type: ValidationType;
    config?: any;
    errorMessage: string;
}

export enum ValidationType {
    required = "required",
    regex = "regex",
    minLength = "minLength",
    maxLength = "maxLength",
    list = "list",
    beforeDate = "beforeDate",
    afterDate = "afterDate",
    number = "number",
    maxNumber = "maxNumber",
    minNumber = "minNumber"
}

export type ValidationResult = {valid: ValidationState, errorMessage?: string}

export function validate(text: string, validations?: Array<Validation>): ValidationResult {


    var valid = true;
    var errorMessage = ""
    
    if (text.trim().length == 0) {
        return {valid: ValidationState.PRISTINE, errorMessage: undefined}
    }

    if (!validations) {            
        return {valid: ValidationState.PRISTINE,  errorMessage: undefined}
    }
    
    const maybeNumber = text.replace(/[^\d.]+/g, '')

    for (var i in validations) {
        const validation = validations[i]

        
        switch (validation.type) {
            case ValidationType.required: {
                valid = valid && (!!text || text.trim().length >= 1);
                break;
            }
            case ValidationType.regex: {
                valid = valid && new RegExp(validation.config).test(text);
                break;
            }
            case ValidationType.maxLength: {
                valid = valid && text.length <= +validation.config;
                break; 
            }
            case ValidationType.minLength: {
                valid = valid && text.length >= +validation.config;
                break; 
            }
            case ValidationType.list: {
                valid = valid && validation.config.find((c: string) => c === text)
                break;
            }
            case ValidationType.beforeDate: {                    
                valid = valid && new Date(text) <= validation.config
                break;
            }
            case ValidationType.afterDate: {                    
                valid = valid && new Date(text) >= validation.config
                break;
            }            
            case ValidationType.number: {
                valid = valid && (Number(maybeNumber) === 0 ||!!Number(maybeNumber))
                break;
            }
            case ValidationType.maxNumber: {
                valid = valid && +maybeNumber <= validation.config
                break;
            }
            case ValidationType.minNumber: {
                valid = valid && +maybeNumber >= validation.config
                break;
            }
            
        }
        if (!valid) {                
            return {valid: ValidationState.ERROR, errorMessage: validation.errorMessage}                
        } 
    }
    return {valid: ValidationState.VALID,  errorMessage: undefined}        
} 