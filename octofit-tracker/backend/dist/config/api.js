"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const codespaceName = process.env.CODESPACE_NAME;
const getApiBaseUrl = () => {
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
