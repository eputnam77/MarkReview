/** Return a list of dev gate commands for the CI pipeline. */
export function configureCiPipeline(): string[] {
    return ['ruff', 'black', 'mypy', 'pytest'];
}

