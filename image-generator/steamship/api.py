from steamship.invocable import PackageService, post, InvocableResponse
from steamship import Steamship

class ImageGeneratorPackage(PackageService):
    @post("/generate")
    def generate(self, title: str = "Unknown", description: str = "Unknown") -> dict:
        """Returns an AI-generated image for a book cover with a title and description."""
        dalle = self.client.use_plugin('dall-e')
        prompt = "Book cover. 4k. High res. No text. Title = {title}. Description = {description}"
        task = dalle.generate(text=prompt)        
        return InvocableResponse(json=task)

if __name__ == "__main__":
    package = ImageGeneratorPackage(Steamship())
    res = package.generate(title="AI Adventure", description="Two robots explore the wild west.")
    print(res)
