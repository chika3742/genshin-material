import Capacitor

@objc(ScrollBouncePlugin)
public class ScrollBouncePlugin: CAPPlugin {
    @objc public override func load() {
        self.webView?.scrollView.bounces = true
        self.webView?.scrollView.alwaysBounceVertical = false
    }
}
