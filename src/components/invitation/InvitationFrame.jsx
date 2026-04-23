"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Invitation } from "./Invitation";
import { designWidth, fitScale } from "./theme/viewports";

export const InvitationFrame = ({
  viewport = "pc",
  palette,
  data,
  template,
  height,
  maxHeight,
}) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scaledInnerHeight, setScaledInnerHeight] = useState(0);

  useLayoutEffect(() => {
    const node = outerRef.current;
    if (!node) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(node);
    setContainerWidth(node.clientWidth);
    return () => ro.disconnect();
  }, []);

  const scale = fitScale(containerWidth, viewport);
  const dWidth = designWidth(viewport);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const measure = () => {
      setScaledInnerHeight(inner.scrollHeight * scale);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [scale, viewport, data, palette, template]);

  const offsetX = Math.max(0, (containerWidth - dWidth * scale) / 2);

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        height: height ?? undefined,
        maxHeight: maxHeight ?? undefined,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#F9FAFB",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: dWidth * scale,
          height: scaledInnerHeight,
          marginLeft: offsetX,
          position: "relative",
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: dWidth,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Invitation
            viewport={viewport}
            palette={palette}
            data={data}
            template={template}
          />
        </div>
      </div>
    </div>
  );
};
