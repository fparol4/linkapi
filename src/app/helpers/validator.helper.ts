import * as yup from 'yup'

class ValidatoHelper {
  public readonly validator: typeof yup = yup

  public async validate (schema: yup.Schema<object>, obj: object): Promise<any> {
    await schema.validate(obj)
    const castedObject = schema.cast(obj, { stripUnknown: true })
    return castedObject
  }

  public async validateFilters (query: object, additionalFilters: object = {}): Promise<any> {
    const schema = this.validator.object().shape({
      page: this.validator.number().min(1).default(1),
      limit: this.validator.number().min(1).default(15),
      ...additionalFilters
    })

    return await this.validate(schema, query)
  }
}

export default new ValidatoHelper()
