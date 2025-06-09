import path from "node:path";

// import { pathToFileURL } from "node:url";

import { globSync } from "glob";
import sass from "sass";
import { describe, expect, test } from "vitest";

const tests = globSync(path.join(__dirname, "./tests/**.scss")).filter(
    (file) => !path.basename(file).startsWith("_"),
);

const testMacro = async (testFile: string) => {
    const css = await sass.compileAsync(testFile, {
        // importers: [
        //     {
        //         findFileUrl(url) {
        //             if (url.startsWith("breakpoint")) {
        //                 return new URL(
        //                     url,
        //                     pathToFileURL(
        //                         path.join(process.cwd(), "stylesheets/"),
        //                     ),
        //                 );
        //             } else if (url === "memo" || url.startsWith("sassy-maps")) {
        //                 return new URL(
        //                     url,
        //                     pathToFileURL(
        //                         path.join(
        //                             process.cwd(),
        //                             "node_modules/sassy-maps/sass/",
        //                         ),
        //                     ),
        //                 );
        //             }
        //             return null;
        //         },
        //     },
        // ],
    });
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
