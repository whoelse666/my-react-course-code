import { CSSProperties, Fragment, PropsWithChildren, ReactNode, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInteractions, useFloating, useClick, useDismiss, offset, arrow, FloatingArrow, flip, useHover } from "@floating-ui/react";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = Side | `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  className?: AlignedPlacement;
  placement?: AlignedPlacement;
  style?: CSSProperties;
  trigger?: "hover" | "click";
  onOpenChange?: (open: boolean) => void;
}
export default function Popover(props: PopoverProps) {
  const { children, content, placement = "bottom", style, trigger = "hover", className, onOpenChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: open => {
      setIsOpen(open);
      onOpenChange?.(open);
    },

    placement: placement,
    middleware: [
      arrow({
        element: arrowRef
      }),
      flip()
    ]
  });

  const interaction = trigger === "hover" ? useHover(context) : useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([interaction, dismiss]);

  const el = useMemo(() => {
    const dom = document.createElement("div");
    dom.className = `wrapper`;
    document.body.appendChild(dom);
    return dom;
  }, []);
  const showDom = (
    <>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          {content}
          <FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" strokeWidth={1} />
        </div>
      )}
    </>
  );
  return (
    <>
      <span className={className} ref={refs.setReference} style={style} {...getReferenceProps()}>
        {children}
      </span>
      {createPortal(showDom, el)}
    </>
  );
}
