// remove-types.js
export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Remove TypeScript type annotations
    root.find(j.TSTypeAnnotation).remove();

    return root.toSource();
}