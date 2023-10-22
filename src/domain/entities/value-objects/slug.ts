export class Slug{
    value: string
    constructor(value:string){
        this.value = value
    }

    /**
     * Receives a string and normalize it as a slug
     * 
     * Example: "A example title" => "a-example-title"
     * 
     * @param text {string}
     */
    static createFromText(text: string){
        const slugText = text.normalize("NFKD")
        .toLocaleLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .replace(/-$/g, '')
        return new Slug(slugText)   
    }
}