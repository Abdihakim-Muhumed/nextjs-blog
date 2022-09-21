import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
    //getting filenames under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        //removing ".md" from filename
        const id = fileName.replace(/\.md$/,'')

        //Reading markdown file as a string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //using gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        //combining the data with id
        return {
            id,
            ...matterResult.data
        };
    });

    //sorting posts by id
    return allPostsData.sort(({date: a}, {date: b}) =>{
        if (a < b) {
            return 1;
        }
        else if (a > b){
            return -1;
        }
        else {
            return 0;
        }
    });
}