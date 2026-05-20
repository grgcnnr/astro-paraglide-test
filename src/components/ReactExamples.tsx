import * as m from "@paraglide/messages";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { locales } from "@paraglide/runtime";

export const StaticReact = () => <p>🧊{m.staticReactText()}</p>;
export const HydratedReact = () => (
  <>
    <p>
      💦{m.hydratedReactText()} <ClickMeButton />
    </p>
    <p>
      <ParaglideMessage
        message={m.hydrationRichText}
        inputs={{ href: "/react/hydration" }}
        markup={{ a: ({ children, options }) => <a href={String(options.href)}>{children}</a> }}
      />
    </p>
  </>
);
export const ClientReact = () => (
  <p>
    📍{m.clientReactText()} <ClickMeButton />
  </p>
);

export const ReactWithChildPropsForContent = ({ children }: { children: ReactNode }) => {
  const doOnclick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.border = "2px solid red";
    setTimeout(() => {
      button.style.border = "2px solid cyan";
    }, 1000);

    setTimeout(() => {
      button.style.removeProperty("border");
    }, 2000);
  };
  return <button onClick={doOnclick}>{children}</button>;
};

export const ReactWithLangProp = ({ lang }: { lang: (typeof locales)[number] }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const pref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!pref.current) return;
    if (checked) pref.current.style.color = "green";
    else pref.current.style.removeProperty("color");
  }, [checked, pref]);

  return (
    <p ref={pref}>
      current lang: {lang}
      <br />
      <input checked={checked} type="checkbox" onChange={() => setChecked(!checked)} />
      {m.langPropText(undefined, { locale: lang })}{" "}
    </p>
  );
};

const ClickMeButton = () => {
  const r = useRef<HTMLButtonElement>(null);
  const doOnClick = () => {
    if (!r.current) return;
    const init = r.current.innerText;
    r.current.innerText = "👍";

    setTimeout(function () {
      if (!r.current) return;

      r.current.innerText = init;
    }, 1000);
  };
  return (
    <button onClick={doOnClick} ref={r}>
      {m.clickMe()}
    </button>
  );
};
