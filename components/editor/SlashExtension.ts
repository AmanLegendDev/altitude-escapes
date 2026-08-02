"use client";

import {
  ReactRenderer,
} from "@tiptap/react";

import Suggestion from "@tiptap/suggestion";

import tippy, {
  type Instance,
} from "tippy.js";

import SlashCommands from "./SlashCommands";

import {
  slashItems,
} from "./SlashItems";

let popup:
  | Instance[]
  | undefined;

let renderer:
  | ReactRenderer
  | undefined;

export const SlashExtension =
  Suggestion({

    char: "/",

    startOfLine: true,

    items: ({ query }) => {

      return slashItems.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      );
    },

    render: () => {

      return {

        onStart: (props) => {

          renderer =
            new ReactRenderer(
              SlashCommands,
              {
                props,

                editor:
                  props.editor,
              }
            );

          if (!props.clientRect) {
            return;
          }

          popup = tippy(
            "body",
            {
              getReferenceClientRect:
                props.clientRect,

              appendTo: () =>
                document.body,

              content:
                renderer.element,

              showOnCreate: true,

              interactive: true,

              trigger: "manual",

              placement:
                "bottom-start",

              theme: "light-border",

              maxWidth: 360,

              offset: [0, 8],
            }
          );
        },

        onUpdate(props) {

          renderer?.updateProps(
            props
          );

          if (
            !props.clientRect
          ) {
            return;
          }

          popup?.[0]
            ?.setProps({
              getReferenceClientRect:
                props.clientRect,
            });
        },

                onKeyDown(props) {

          const {
            event,
          } = props;

          if (
            event.key ===
            "Escape"
          ) {
            popup?.[0]?.hide();

            return true;
          }

          if (
            renderer?.ref &&
            (
              renderer.ref as any
            ).onKeyDown
          ) {
            return (
              renderer.ref as any
            ).onKeyDown(props);
          }

          return false;
        },

        onExit() {

          popup?.[0]?.destroy();

          renderer?.destroy();

          popup = undefined;

          renderer = undefined;
        },
      };
    },
  });

export default SlashExtension;