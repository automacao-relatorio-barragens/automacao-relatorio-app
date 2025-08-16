import React, { useState } from "react";
import { View, Button, TextInput, Image, ScrollView } from "react-native";
import { capturePhoto } from "../lib/images/capturePhoto";
import { processImage } from "../lib/images/processImage";
import { saveDraft, ImageEntry } from "../lib/db";

export default function Index() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const draftId = React.useRef(`draft-${Date.now()}`).current;

  const addPhoto = async () => {
    try {
      const file = await capturePhoto();
      const processed = await processImage(file);
      setImages((imgs) => [
        ...imgs,
        {
          id: crypto.randomUUID(),
          file: processed,
          title: "",
          caption: "",
          tags: "",
        },
      ]);
    } catch (e) {
      console.warn(e);
    }
  };

  const updateImage = (id: string, field: keyof ImageEntry, value: string) => {
    setImages((imgs) =>
      imgs.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  const save = async () => {
    await saveDraft({ id: draftId, images });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button title="Add Photo" onPress={addPhoto} />
      {images.map((img) => (
        <View key={img.id} style={{ marginVertical: 8 }}>
          <Image
            source={{ uri: URL.createObjectURL(img.file) }}
            style={{ width: 100, height: 100 }}
          />
          <TextInput
            placeholder="Title"
            value={img.title}
            onChangeText={(t) => updateImage(img.id, "title", t)}
          />
          <TextInput
            placeholder="Caption"
            value={img.caption}
            onChangeText={(t) => updateImage(img.id, "caption", t)}
          />
          <TextInput
            placeholder="Tags"
            value={img.tags}
            onChangeText={(t) => updateImage(img.id, "tags", t)}
          />
        </View>
      ))}
      <Button title="Save Draft" onPress={save} />
    </ScrollView>
  );
}
