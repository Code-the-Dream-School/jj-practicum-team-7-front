export default function ChallengeDetails({ challenge }) {
  return (
    <div>
      <h1>Challenge Details</h1>
      {challenge && (
        <p className="mt-2 text-gray-700">
          Title: <strong>{challenge.title}</strong> <br />
          Category: {challenge.category}
        </p>
      )}
    </div>
  );
}