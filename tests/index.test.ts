import path from "node:path";

import { globSync } from "glob";
import sass from "sass";
import { describe, expect, test } from "vitest";

const tests = globSync(path.join(__dirname, "./tests/**.scss")).filter(
    (file) => !path.basename(file).startsWith("_"),
);

const testMacro = async (testFile: string) => {
    const css = await sass.compileAsync(testFile);
    expect(css.css).toMatchSnapshot();
};

describe("Compile", () => {
    tests.forEach((testFile) => {
        const basename = path.basename(testFile);
        test(basename, async () => {
            await testMacro(testFile);
        });
    });
});
