"use client";

import { useState, useEffect } from "react";

type GitHubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
};

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
};

type AppListing = {
  id: string;
  name: string;
  version: string;
  sizeBytes: number;
  releaseDate: string;
  downloadUrl: string;
  downloadCount: number;
};

const GITHUB_USERNAME = "didierdrin"; // Replace with your GitHub username
const REPOSITORY_NAME = "igalive-workplace"; // Replace with your repository name

function formatSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"] as const;
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export default function Home() {
  const [app, setApp] = useState<AppListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestRelease() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/releases/latest`
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        const releaseData: GitHubRelease = await response.json();
        
        const apkAsset = releaseData.assets.find(asset => 
          asset.name.includes('.apk') || 
          asset.name.toLowerCase().includes('android')
        );

        if (!apkAsset) {
          throw new Error('No APK file found in the latest release');
        }

        setApp({
          id: apkAsset.name,
          name: "igaLive",
          version: releaseData.tag_name,
          sizeBytes: apkAsset.size,
          releaseDate: releaseData.published_at,
          downloadUrl: apkAsset.browser_download_url,
          downloadCount: apkAsset.download_count
        });
      } catch (err) {
        console.error('Error fetching release:', err);
        setError(err instanceof Error ? err.message : 'Failed to load release');
      } finally {
        setLoading(false);
      }
    }

    fetchLatestRelease();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-2xl font-bold">iL</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">igaLive</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Educational Learning Platform - Empowering Rwanda's educational future with comprehensive courses and AI-powered tutoring.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Download Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Download igaLive</h2>
            <p className="text-gray-600 mb-6">Get the latest version of our Android app</p>
            
            {loading && (
              <div className="text-emerald-600 mb-6">
                <svg className="animate-spin w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking for latest version...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center text-red-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {app && (
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600">Latest Version: <span className="font-semibold text-emerald-600">{app.version}</span></div>
                  <div className="text-sm text-gray-600">Released: {new Date(app.releaseDate).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-600">File size: {formatSize(app.sizeBytes)}</div>
                  <div className="text-sm text-gray-600">Downloads: {app.downloadCount.toLocaleString()}</div>
                </div>
                <a 
                  href={app.downloadUrl}
                  className="inline-flex items-center justify-center w-full bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download APK
                </a>
              </div>
            )}
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">App Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Educational Pathways</strong>
                  <p className="text-gray-600 text-sm">Mathematics & Sciences, Arts & Humanities, Languages</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">AI Tutor</strong>
                  <p className="text-gray-600 text-sm">Gemini-powered chatbot for educational assistance</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Course Management</strong>
                  <p className="text-gray-600 text-sm">Enroll in courses and track your progress</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Secure Authentication</strong>
                  <p className="text-gray-600 text-sm">Firebase-powered secure login system</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-gray-900">Calendar Integration</strong>
                  <p className="text-gray-600 text-sm">Schedule and track learning progress</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Installation Instructions
          </h3>
          <ol className="text-emerald-700 space-y-2">
            <li>1. Download the APK file above</li>
            <li>2. Open the downloaded file on your Android device</li>
            <li>3. If prompted, allow installation from unknown sources</li>
            <li>4. Follow the installation instructions</li>
            <li>5. Open igaLive and start your educational journey!</li>
          </ol>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>&copy; 2025 igaLive. Built with ❤️ for Rwanda's educational future.</p>
        </footer>
      </div>
    </div>
  );
}
