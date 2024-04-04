const Job = require('./models/job');

async function scheduleJobs() {
    const pendingJobs = await Job.find({ status: 'Pending' });

    const processJob = async (index) => {
        if (index >= pendingJobs.length) {
            return; 
        }

        const job = pendingJobs[index];
        job.status = 'Uploading';
        await job.save();

        console.log(`Uploading ${job.filename}...`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        job.status = 'Converting';
        await job.save();

        console.log(`Converting ${job.filename}...`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        job.status = 'Completed';
        await job.save();

        console.log(`${job.filename} conversion completed`);

        await processJob(index + 1);
    };

    await processJob(0);
}

module.exports = { scheduleJobs };
