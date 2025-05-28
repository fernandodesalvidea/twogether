// src/Profile.jsx
export default function Profile({ user }) {
  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}