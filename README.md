# backstage-vanilla-releases

This repository serves as an archive of vanilla backstage releases with its dependencies pinned.

## How to add a new release

1. Create a new backstage instance with the default parameters.

    ```console
    npx @backstage/create-app@latest
    ```

2. Pin all the dependencies.

    1. Filter files by `package.json`.

    2. Replace `"~` with `"`.

    3. Replace `"^` with `"`.

3. Update `packages/app/package.json`.

    Note, in future versions of backstage we may want the React 18 types.

    ```console
    yarn workspace app add -D @types/react@17 @types/react-dom@17
    ```

4. Run `yarn upgrade-interactive --latest`

    - Upgrade all backstage related packages (core dep, testing dep, etc) to the latest minor version. e.g. `cypress`, `winston`, `react`

    - Upgrade all non backstage related packages to the latest version. e.g. `concurrently`, `prettier`, `eslint`

5. Copy over contents into an empty branch with the backstage version as the branch name.

    e.g. Backstage 1.17.2 release

    ```console
    git switch -c --orphan 1.17.x
    ```

6. Git commit, push, etc
