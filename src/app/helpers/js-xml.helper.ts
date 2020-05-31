import jsXml from 'xml-js'

export class JsXmlHelper {
  public static object2Xml (obj: object): string {
    const xml = jsXml.js2xml(obj, { compact: true, spaces: 4 })
    return xml
  }
}
