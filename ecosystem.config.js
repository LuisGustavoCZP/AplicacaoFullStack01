module.exports = {
    apps: [
        {
        script: 'index.js',
        cwd: 'backend/',
        name: 'Backend',
        watch: true
        },
        {
        script: 'index.js',
        cwd: 'frontend/',
        name: 'Frontend',
        watch: true
        }
    ]
}