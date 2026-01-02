"use client";

import { useSearchParams } from "next/navigation";

export default function FailPage() {
  const params = useSearchParams();

  return (
    <div>
      <h2>결제 실패</h2>
      <p>사유: {params.get("message")}</p>
      <p>코드: {params.get("code")}</p>
    </div>
  );
}
