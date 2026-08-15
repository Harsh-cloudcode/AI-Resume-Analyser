export async function analyzeResume(file: File, questions: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("questions", questions);

  const res = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    body: formData,
  });

  return res.json();
}