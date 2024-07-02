"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { default as Content } from "./content";
import { default as Description } from "./description";
import { default as Footer } from "./footer";
import { default as Header } from "./header";
import { default as Overlay } from "./overlay";
import { default as Title } from "./title";

const { Trigger, Portal, Close, Root } = Dialog;

const Sheet = {
  Root,
  Portal,
  Overlay,
  Trigger,
  Close,
  Content,
  Header,
  Footer,
  Title,
  Description,
};

export default Sheet;
