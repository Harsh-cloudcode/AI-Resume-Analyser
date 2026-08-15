"use client"

import { useState } from "react"
import { Save, Key, Globe, Bell, Shield, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Separator } from "../../components/ui/separator"
import { DashboardLayout } from "../../components/dashboard-layout"

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("")
  const [wordpressUrl, setWordpressUrl] = useState("")
  const [wordpressUsername, setWordpressUsername] = useState("")
  const [wordpressPassword, setWordpressPassword] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [candidateAlerts, setCandidateAlerts] = useState(true)
  const [scoreThreshold, setScoreThreshold] = useState("80")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and integrations</p>
        </div>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="mt-6 space-y-6">
            {/* Gemini API */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Gemini API</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Configure your Google Gemini API key for AI-powered resume analysis
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gemini-key" className="text-foreground">
                    API Key
                  </Label>
                  <Input
                    id="gemini-key"
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="bg-secondary border-0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save API Key
                  </Button>
                  <Button variant="outline">Test Connection</Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Analysis Settings</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Configure AI analysis parameters and thresholds
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="score-threshold" className="text-foreground">
                    Auto-Shortlist Score Threshold
                  </Label>
                  <Input
                    id="score-threshold"
                    type="number"
                    min="0"
                    max="100"
                    value={scoreThreshold}
                    onChange={(e) => setScoreThreshold(e.target.value)}
                    className="bg-secondary border-0 w-32"
                  />
                  <p className="text-xs text-muted-foreground">
                    Candidates with scores above this threshold will be automatically shortlisted
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wordpress" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">WordPress Integration</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Connect your WordPress site to sync job postings and receive applications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wp-url" className="text-foreground">
                    WordPress Site URL
                  </Label>
                  <Input
                    id="wp-url"
                    type="url"
                    placeholder="https://yoursite.com"
                    value={wordpressUrl}
                    onChange={(e) => setWordpressUrl(e.target.value)}
                    className="bg-secondary border-0"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="wp-username" className="text-foreground">
                      Username
                    </Label>
                    <Input
                      id="wp-username"
                      placeholder="WordPress username"
                      value={wordpressUsername}
                      onChange={(e) => setWordpressUsername(e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wp-password" className="text-foreground">
                      Application Password
                    </Label>
                    <Input
                      id="wp-password"
                      type="password"
                      placeholder="WordPress application password"
                      value={wordpressPassword}
                      onChange={(e) => setWordpressPassword(e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Generate an application password in WordPress under Users → Profile → Application
                  Passwords
                </p>
                <div className="flex items-center gap-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">Test Connection</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Email Notifications</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Configure when and how you receive email notifications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your recruitment pipeline
                    </p>
                  </div>
                  <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">High-Score Candidate Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a candidate scores above the threshold
                    </p>
                  </div>
                  <Switch checked={candidateAlerts} onCheckedChange={setCandidateAlerts} />
                </div>
                <div className="pt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
