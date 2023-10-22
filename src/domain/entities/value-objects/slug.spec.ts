import { expect, test } from "vitest";
import { Slug } from "./slug";

test('it should be able to create a slug from text', () => {
    const slug = Slug.createFromText('A example text')
    expect(slug.value).toEqual('a-example-text')
})