import { useEffect, useState } from "react";

interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  location?: string;
  followers: number;
  following: number;
  public_repos: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://backend-vercel-ti8p.vercel.app/api/")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfile(data.data);
        } else {
          setError("Profile data not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">GitHub Profile</h2>
      {profile && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
          />
          <h3 className="text-xl font-semibold mt-2">{profile.name || profile.login}</h3>
          {profile.bio && <p className="text-gray-600">{profile.bio}</p>}
          {profile.location && <p className="text-gray-500">{profile.location}</p>}

          <div className="flex justify-center gap-4 mt-4 text-gray-700">
            <p>🌟 {profile.public_repos} Repos</p>
            <p>👥 {profile.followers} Followers</p>
            <p>🔗 {profile.following} Following</p>
          </div>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-4 block"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
