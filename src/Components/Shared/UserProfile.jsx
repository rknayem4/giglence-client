"use client";

import { Avatar, Button, Dropdown, Label } from "@heroui/react";

export function UserProfile({ user }) {
  const { name } = user;
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="none">
        <Avatar>
          <Avatar.Image
            alt="John Doe"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
          />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>New file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="copy-link" textValue="Copy link">
            <Label>Copy link</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit-file" textValue="Edit file">
            <Label>Edit file</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="delete-file"
            textValue="Delete file"
            variant="danger"
          >
            <Label>Delete file</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
