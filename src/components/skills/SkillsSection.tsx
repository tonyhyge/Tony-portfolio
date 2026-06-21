"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/container"
import { categoryDisplay, CATEGORY_COLORS } from "@/app/data/skills"
import { SkillCategory } from "./SkillCategory"
import { SkillPopover } from "./SkillPopover"

export function SkillsSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [activeSkill, setActiveSkill] = useState<{
    name: string
    projects: { slug: string; title: string }[]
  } | null>(null)

  const triggerRef = useRef<HTMLElement | null>(null)

  const handleToggle = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName))
  }

  const handleSkillClick = (
    skillName: string,
    projects: { slug: string; title: string }[] | undefined,
    badgeEl: HTMLElement
  ) => {
    if (!projects || projects.length === 0) return
    setActiveSkill({ name: skillName, projects })
    triggerRef.current = badgeEl
  }

  const handleClosePopover = () => {
    setActiveSkill(null)
    triggerRef.current = null
  }

  return (
    <section id="skills" className="py-16 md:py-24">
      <Container>
        {/* Section heading — gradient text per D-22 */}
        <div className="mb-10 md:mb-14">
          <h2
            className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent font-heading text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Skills
          </h2>
          <p className="text-base text-muted-foreground mt-2">
            Technologies and tools I work with
          </p>
        </div>

        {/* Accordion categories */}
        <div className="space-y-3">
          {categoryDisplay.map((category) => {
            const colorKey = CATEGORY_COLORS[category.name] ?? "cyan"
            const isOpen = openCategory === category.name

            return (
              <SkillCategory
                key={category.name}
                name={category.name}
                color={colorKey}
                isOpen={isOpen}
                onToggle={() => handleToggle(category.name)}
              >
                {category.skills.map((skill) => {
                  const hasProjects =
                    skill.relatedProjects && skill.relatedProjects.length > 0

                  return (
                    <Badge
                      key={skill.name}
                      skillColor={colorKey as "cyan" | "violet" | "amber"}
                      className={
                        hasProjects ? "cursor-pointer" : "cursor-default"
                      }
                      onClick={
                        hasProjects
                          ? (e: React.MouseEvent<HTMLSpanElement>) =>
                              handleSkillClick(
                                skill.name,
                                skill.relatedProjects,
                                e.currentTarget
                              )
                          : undefined
                      }
                    >
                      {skill.name}
                    </Badge>
                  )
                })}
              </SkillCategory>
            )
          })}
        </div>
      </Container>

      {/* Popover for related projects */}
      {activeSkill && (
        <SkillPopover
          projects={activeSkill.projects}
          onClose={handleClosePopover}
          triggerRef={triggerRef}
          isOpen={!!activeSkill}
        />
      )}
    </section>
  )
}
