import Foundation
import Vision
import AppKit

let inputURL = URL(fileURLWithPath: "public/assets/avatar_raw.jpg")
guard let nsImage = NSImage(contentsOf: inputURL),
      let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

if #available(macOS 14.0, *) {
    let request = VNGenerateForegroundInstanceMaskRequest()
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
        guard let result = request.results?.first else {
            print("No mask generated")
            exit(1)
        }
        let mask = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
        print("Vision mask generated successfully!")
    } catch {
        print("Vision error: \(error)")
    }
} else {
    print("macOS version below 14.0")
}
