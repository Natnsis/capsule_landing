import { redirect, type RequestHandler } from '@sveltejs/kit';

// Latest published APK on GitHub Releases.
const APK = 'https://github.com/Natnsis/capsule/releases/latest/download/capsule.apk';

// Serve the download from our own origin so mobile browsers get a single, clean
// navigation to the file. Linking straight to the GitHub URL makes the current
// tab follow GitHub's 302 to objects.githubusercontent.com mid-transfer, which
// on phones tends to freeze the download near 100%. A same-origin 302 hands the
// browser one hop it can hand to its download manager.
export const GET: RequestHandler = () => {
	redirect(302, APK);
};

export const prerender = false;
